import { generate } from "random-words";
export default function AvatarGenerator() {
  // TODO: implement random function to auto generate random avatar
  return `https://api.multiavatar.com/${generate()}.png`;
}
