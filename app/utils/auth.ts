export default async function generateToken() {
    let req = await fetch('https://devtoken.neoma.co.uk/GenerateToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': '5F0D507F85624792A663AA2AE2E966CA'
        },
        body: JSON.stringify({ tenantId: '8C8CDB09-3311-4DCE-A170-7E88DEFD2B25', userId: 'A90667B8-241D-4E2B-90F5-22FAA5A4DB0A' })
    });

    let data = await req.json();
    return data.token;
}