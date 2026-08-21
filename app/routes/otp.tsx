import OtpVerificationDemo from "~/components/otpverify";
import type { Route } from "./+types/otp";
import { telFun } from "~/lib/telFun";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  formData.append("action", "submit-otp");
  await telFun(formData);
 // console.log(formData);
}

export default function Otp() {
  return (
    <>
    <OtpVerificationDemo/>
    </>
  )
}