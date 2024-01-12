import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabaseUrl = 'https://mnyrghqrqcnveqncmnao.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ueXJnaHFycWNudmVxbmNtbmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5NzI0NzUsImV4cCI6MjAyMDU0ODQ3NX0.60tse2VGlFw3T7qTwvsQ7wO3cegpWQLR0GD2DbO82Fk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
