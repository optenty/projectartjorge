export interface User {
  id:                   string;
  aud:                  string;
  role:                 string;
  email:                string;
  email_confirmed_at:   Date;
  phone:                string;
  confirmation_sent_at: Date;
  confirmed_at:         Date;
  last_sign_in_at:      Date;
  app_metadata:         AppMetadata;
  user_metadata:        UserMetadata;
  identities:           Identity[];
  created_at:           Date;
  updated_at:           Date;
}

export interface AppMetadata {
  provider:  string;
  providers: string[];
}

export interface Identity {
  identity_id:     string;
  id:              string;
  user_id:         string;
  identity_data:   IdentityData;
  provider:        string;
  last_sign_in_at: Date;
  created_at:      Date;
  updated_at:      Date;
  email:           string;
}

export interface IdentityData {
  email:          string;
  email_verified: boolean;
  phone_verified: boolean;
  sub:            string;
}

export interface UserMetadata {
}
