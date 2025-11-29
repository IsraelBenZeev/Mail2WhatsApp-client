import { supabase } from '../utils/supabase-client';
import type { Dispatch } from 'react';
export const use_chat_ids = () => {
  const get_chat_id = async (
    userId: string,
    setStatusCheckChatID: Dispatch<React.SetStateAction<'idle' | 'loading' | 'success' | 'failed'>>
  ) => {
    setStatusCheckChatID('loading');
    const tempuserId = '1122fee0-eece-4e69-9554-b8d4792276ca'.trim();
    console.log('tempuserId: ', tempuserId);
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
    const isChatID = data?.chat_id ? true : false;
    console.log('isChatID: ', isChatID);

    return isChatID;
  };
  return { get_chat_id };
};
