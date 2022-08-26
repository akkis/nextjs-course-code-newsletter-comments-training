function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email ?? null;

    if (email) {
      // console.log(`${email} registered successfuly!`);

      res.status(201).json({ success: true, message: "Success!" });
    } else {
      res.status(422).json({ success: false, message: "Email missing!" });
    }
  }
}

export default handler;
