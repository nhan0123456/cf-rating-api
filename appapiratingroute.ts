export async function GET() {
  const handle = "nhan0123456";
  const res = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
  const data = await res.json();

  if (data.status !== "OK") {
    return new Response(JSON.stringify({ error: "Không tìm thấy user" }), { status: 404 });
  }

  const simplified = data.result.map((entry: any) => ({
    contestName: entry.contestName,
    time: entry.ratingUpdateTimeSeconds * 1000,
    oldRating: entry.oldRating,
    newRating: entry.newRating,
  }));

  return new Response(JSON.stringify(simplified), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
