export default function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    let answer = 'Sorry, I don’t understand your request.';

    if (query.toLowerCase().includes('passport')) {
      answer = 'You can renew your passport via Absher under "Services > Passports".';
    } else if (query.toLowerCase().includes('traffic')) {
      answer = 'Traffic violations can be checked in Absher under "Traffic Services".';
    } else if (query.toLowerCase().includes('id')) {
      answer = 'You can renew your National ID via Absher under "Civil Affairs".';
    }

    res.status(200).json({ answer });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
