import { MessageItem } from "./MessageItem"

export const BoxMessages = () => {
  return (
    <div>
      <MessageItem label="Hello" time="10:00 AM" isOwn={true} />
      <MessageItem label="Hi there!" time="10:05 AM" isOwn={false} />
    </div>
  )
}