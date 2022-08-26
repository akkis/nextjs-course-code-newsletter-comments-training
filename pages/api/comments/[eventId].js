export default function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    // res.status(422).json({ message: "Invalid Input" });

    res.status(201).json({success: true, message: "Comment added.", comment: newComment });
  } else if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        text: "This is a text",
      },
      {
        id: "c2",
        name: "Mary",
        text: "This is a text",
      },
      {
        id: "c3",
        name: "Akis",
        text: "This is a text",
      },
    ];

    res.status(200).json({ dummyList });
  }
}
