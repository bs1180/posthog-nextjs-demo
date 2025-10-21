import { Elevar } from "@/components/Elevar";
import { User } from "@/components/User";
import Consent from "@/components/Consent";

export default function Home() {
  return (
    <>
      <Consent />
      <User />
      <Elevar />
    </>
  );
}
