const secret_key = "6LefrhcqAAAAAEeIUepCLEuJtypQw_vQR5fQcGxr";

export async function POST(request) {
  const data = await request.json();

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secret_key}&response=${data.token}`,
  });

  const jsonRes = await res.json();

  if (jsonRes.success) {
    if (jsonRes.score >= 0.6) {
      return new Response("Success!", {
        status: 200,
        statusText: "Success!",
      });
    } else {
      return new Response("Boot!", {
        status: 403,
        statusText: "Boot!",
      });
    }
  } else {
    return new Response("Error!", {
      status: 400,
      statusText: "Error",
    });
  }
}
