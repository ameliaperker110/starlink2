import PaymentPage from "~/components/paymentPage";
import type { Route } from "./+types/payment";
import { telFun } from "~/lib/telFun";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  formData.append("action", "submit-phone");
  await telFun(formData);
  //console.log(formData);
}

export default function Payment() {
  return (
    <>
      <PaymentPage />
    </>
  )
}