import { useUser } from '../context/UserContext';
import { supabase } from '../utils/supabase-client';
import type { Dispatch } from 'react';
export const useTelegram = () => {
  const { setIsChatID } = useUser();
  const init_chat_id = async (
    userId: string,
    setStatusCheckChatID: Dispatch<React.SetStateAction<'idle' | 'loading' | 'success' | 'failed'>>
  ) => {
    setStatusCheckChatID('loading');
    const { data, error } = await supabase
      .from('user_chat_ids')
      .select('chat_id')
      .eq('user_id', userId)
      .maybeSingle();

    console.log('data: ', data);
    if (error) {
      console.log('error: ', error);
      setStatusCheckChatID('failed');
      return null;
    }
    setStatusCheckChatID('success');
    return data?.chat_id ? true : false
  };
  const delete_chat_id_from_DB = async (userId: string) => {
    const { error } = await supabase.from('user_chat_ids').delete().eq('user_id', userId);
    if (error) {
      console.log('Error deleting chat ID: ', error);
      return;
    }
    setIsChatID(false);
  };
  const insert_time_to_DB = async (userId: string, time: string) => {
    const timeValue = time.trim();
    const [hour, minute] = timeValue.split(':').map(Number);
    const now = new Date();
    now.setHours(hour);
    now.setMinutes(minute);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const { data, error } = await supabase
      .from('user_chat_ids')
      .update({ time: now.toISOString() })
      .eq('user_id', userId)
      .is('name', null);

    if (error) {
      console.error('Error updating row:', error);
    } else {
      console.log('Row updated:', data);
    }
  };
  return { init_chat_id, delete_chat_id_from_DB, insert_time_to_DB };
};
