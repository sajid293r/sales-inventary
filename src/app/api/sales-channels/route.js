import { getAllSalesChannels } from "@/actions/getAllSalesChannels";

export async function GET(req) {
  const data = await getAllSalesChannels();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
