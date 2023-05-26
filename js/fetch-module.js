export async function getServerData(dataForm) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${dataForm}`);
    const xTotalCount = res.headers.get('X-Total-Count');
    const data = await res.json();
    return {data, xTotalCount};
};
