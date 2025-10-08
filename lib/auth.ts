import { supabase } from './supabase';

export interface SignUpData {
  email: string;
  password: string;
  businessName: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Kayıt fonksiyonu - Email confirmation gerekli
export async function signUp(data: SignUpData) {
  try {
    // 1. Slug oluştur
    const baseSlug = data.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('slug')
      .eq('slug', baseSlug)
      .maybeSingle();

    const slug = existingBusiness 
      ? `${baseSlug}-${Date.now()}` 
      : baseSlug;

    // 2. Auth kullanıcısı oluştur
    // Email confirmation email otomatik gönderilecek
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('User creation failed');
    }

    console.log('User created:', authData.user.id);

    // 3. Business kaydı oluştur
    const businessRecord = {
      id: authData.user.id,
      name: data.businessName,
      slug: slug,
      email: data.email,
      phone: data.phone || null,
    };

    console.log('Inserting business:', businessRecord);

    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .insert(businessRecord as any)
      .select()
      .single();

    if (businessError) {
      console.error('Business insert error:', businessError);
      throw businessError;
    }

    console.log('Business created:', businessData);

    // NOT: Auto-login YOK - kullanıcı email'ini confirm etmeli
    return { 
      success: true, 
      data: businessData,
      message: 'Silakan cek email Anda untuk konfirmasi akun'
    };
  } catch (error: any) {
    console.error('SignUp error:', error);
    return { 
      success: false, 
      error: error.message || 'Terjadi kesalahan saat mendaftar' 
    };
  }
}

// Giriş fonksiyonu
export async function signIn(data: SignInData) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    return { success: true, data: authData };
  } catch (error: any) {
    console.error('SignIn error:', error);
    
    // Email not confirmed hatası için özel mesaj
    if (error.message && error.message.includes('Email not confirmed')) {
      return { 
        success: false, 
        error: 'Email belum dikonfirmasi. Silakan cek inbox Anda.' 
      };
    }
    
    return { 
      success: false, 
      error: error.message || 'Email atau kata sandi salah' 
    };
  }
}

// Çıkış fonksiyonu
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Mevcut kullanıcıyı al
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message, user: null };
  }
}

// Business bilgilerini al
export async function getBusinessByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}