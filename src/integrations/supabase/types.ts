export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      case_requests: {
        Row: {
          case_id: string
          created_at: string | null
          id: string
          lawyer_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          case_id: string
          created_at?: string | null
          id?: string
          lawyer_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string | null
          id?: string
          lawyer_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_requests_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_requests_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          assigned_lawyer_id: string | null
          closed_at: string | null
          closure_initiated_by: string | null
          congressional_district: string
          constitution_violations: string[] | null
          created_at: string | null
          description: string
          id: string
          state: string
          status: Database["public"]["Enums"]["case_status"] | null
          title: string
          udhr_violations: string[] | null
          updated_at: string | null
          victim_id: string
        }
        Insert: {
          assigned_lawyer_id?: string | null
          closed_at?: string | null
          closure_initiated_by?: string | null
          congressional_district: string
          constitution_violations?: string[] | null
          created_at?: string | null
          description: string
          id?: string
          state?: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title: string
          udhr_violations?: string[] | null
          updated_at?: string | null
          victim_id: string
        }
        Update: {
          assigned_lawyer_id?: string | null
          closed_at?: string | null
          closure_initiated_by?: string | null
          congressional_district?: string
          constitution_violations?: string[] | null
          created_at?: string | null
          description?: string
          id?: string
          state?: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title?: string
          udhr_violations?: string[] | null
          updated_at?: string | null
          victim_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cases_assigned_lawyer_id_fkey"
            columns: ["assigned_lawyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cases_victim_id_fkey"
            columns: ["victim_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_information: {
        Row: {
          case_id: string
          created_at: string | null
          email: string | null
          id: string
          lawyer_id: string
          phone_number: string | null
          victim_id: string
        }
        Insert: {
          case_id: string
          created_at?: string | null
          email?: string | null
          id?: string
          lawyer_id: string
          phone_number?: string | null
          victim_id: string
        }
        Update: {
          case_id?: string
          created_at?: string | null
          email?: string | null
          id?: string
          lawyer_id?: string
          phone_number?: string | null
          victim_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_information_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_information_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_information_victim_id_fkey"
            columns: ["victim_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      past_cases: {
        Row: {
          case_description: string
          created_at: string | null
          date_completed: string | null
          id: string
          lawyer_id: string
          location: string
          outcome: string | null
          victim_name: string
        }
        Insert: {
          case_description: string
          created_at?: string | null
          date_completed?: string | null
          id?: string
          lawyer_id: string
          location: string
          outcome?: string | null
          victim_name: string
        }
        Update: {
          case_description?: string
          created_at?: string | null
          date_completed?: string | null
          id?: string
          lawyer_id?: string
          location?: string
          outcome?: string | null
          victim_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "past_cases_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          city: string
          congressional_district: string | null
          contact_email: string | null
          created_at: string | null
          full_name: string
          id: string
          phone_number: string | null
          profile_picture_url: string | null
          pronouns: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialties_constitution: string[] | null
          specialties_udhr: string[] | null
          state: string
          successfully_closed_count: number | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          city: string
          congressional_district?: string | null
          contact_email?: string | null
          created_at?: string | null
          full_name: string
          id: string
          phone_number?: string | null
          profile_picture_url?: string | null
          pronouns?: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialties_constitution?: string[] | null
          specialties_udhr?: string[] | null
          state: string
          successfully_closed_count?: number | null
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          city?: string
          congressional_district?: string | null
          contact_email?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone_number?: string | null
          profile_picture_url?: string | null
          pronouns?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialties_constitution?: string[] | null
          specialties_udhr?: string[] | null
          state?: string
          successfully_closed_count?: number | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_case_request: {
        Args: { _case_id: string; _lawyer_id: string; _request_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "lawyer" | "victim"
      case_status: "open" | "pending_closure" | "successfully_closed" | "closed"
      user_role: "lawyer" | "victim"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "lawyer", "victim"],
      case_status: ["open", "pending_closure", "successfully_closed", "closed"],
      user_role: ["lawyer", "victim"],
    },
  },
} as const
