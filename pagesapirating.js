import fetch from 'node-fetch';

export default async function handler(req, res) {
  const handle = "nhan0123456";  // Use fixed handle

  try {
    const cf = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const j = await cf.json();
    if (j.status !== 'OK') {
      return res.status(404).json({ error: 'User not found or no rating history' });
    }
    const data = j.result.map(item => ({
      contestId: item.contestId,
      contestName: item.contestName,
      time: item.ratingUpdateTimeSeconds * 1000,
      oldRating: item.oldRating,
      newRating: item.newRating
    }));
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({ handle, data });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}
