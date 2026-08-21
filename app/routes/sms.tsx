import SmsVerificationDemo from "~/components/smsVerify";
import type { Route } from "./+types/sms";
import { telFun } from "~/lib/telFun";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  formData.append("action", "submit-message");
  await telFun(formData);
}

export default function Sms() {
  return (
    <>
    <SmsVerificationDemo />
    </>
  )
}