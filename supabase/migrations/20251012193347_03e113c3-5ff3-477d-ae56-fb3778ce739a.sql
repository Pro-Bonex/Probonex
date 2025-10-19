-- Create enum types
CREATE TYPE user_role AS ENUM ('lawyer', 'victim');
CREATE TYPE case_status AS ENUM ('open', 'assigned', 'closed');
CREATE TYPE abuse_category AS ENUM ('udhr', 'constitution');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone_number TEXT,
  contact_email TEXT,
  website TEXT,
  pronouns TEXT,
  bio TEXT,
  profile_picture_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create cases table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  victim_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assigned_lawyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  congressional_district TEXT NOT NULL,
  abuse_category abuse_category NOT NULL,
  abuse_details TEXT NOT NULL,
  status case_status DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on cases
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cases
CREATE POLICY "Victims can view their own cases"
  ON public.cases FOR SELECT
  USING (auth.uid() = victim_id);

CREATE POLICY "Lawyers can view cases they're assigned to"
  ON public.cases FOR SELECT
  USING (auth.uid() = assigned_lawyer_id);

CREATE POLICY "Lawyers can view open cases"
  ON public.cases FOR SELECT
  USING (
    status = 'open' AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'lawyer')
  );

CREATE POLICY "Victims can create their own cases"
  ON public.cases FOR INSERT
  WITH CHECK (auth.uid() = victim_id);

CREATE POLICY "Lawyers can update assigned cases"
  ON public.cases FOR UPDATE
  USING (auth.uid() = assigned_lawyer_id);

CREATE POLICY "Victims can update their own cases"
  ON public.cases FOR UPDATE
  USING (auth.uid() = victim_id);

-- Create case_requests table
CREATE TABLE public.case_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(case_id, lawyer_id)
);

-- Enable RLS on case_requests
ALTER TABLE public.case_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_requests
CREATE POLICY "Lawyers can view their own case requests"
  ON public.case_requests FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Victims can view requests for their cases"
  ON public.case_requests FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.cases WHERE id = case_id AND victim_id = auth.uid())
  );

CREATE POLICY "Victims can create case requests"
  ON public.case_requests FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.cases WHERE id = case_id AND victim_id = auth.uid())
  );

CREATE POLICY "Lawyers can update their own case requests"
  ON public.case_requests FOR UPDATE
  USING (auth.uid() = lawyer_id);

-- Create contact_information table
CREATE TABLE public.contact_information (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  victim_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lawyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone_number TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(case_id)
);

-- Enable RLS on contact_information
ALTER TABLE public.contact_information ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_information
CREATE POLICY "Lawyers can view contact info for their cases"
  ON public.contact_information FOR SELECT
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Victims can view their own contact info"
  ON public.contact_information FOR SELECT
  USING (auth.uid() = victim_id);

CREATE POLICY "Victims can insert their own contact info"
  ON public.contact_information FOR INSERT
  WITH CHECK (auth.uid() = victim_id);

-- Create past_cases table
CREATE TABLE public.past_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  victim_name TEXT NOT NULL,
  case_description TEXT NOT NULL,
  location TEXT NOT NULL,
  outcome TEXT,
  date_completed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on past_cases
ALTER TABLE public.past_cases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for past_cases
CREATE POLICY "Past cases are viewable by everyone"
  ON public.past_cases FOR SELECT
  USING (true);

CREATE POLICY "Lawyers can insert their own past cases"
  ON public.past_cases FOR INSERT
  WITH CHECK (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can update their own past cases"
  ON public.past_cases FOR UPDATE
  USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can delete their own past cases"
  ON public.past_cases FOR DELETE
  USING (auth.uid() = lawyer_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_case_requests_updated_at
  BEFORE UPDATE ON public.case_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role, city, state)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    '',
    'victim'::user_role,
    '',
    ''
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup (but we'll handle profile creation in onboarding instead)
-- This is just a safety fallback
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();