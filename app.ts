const server = Deno.listen({ port: 8000 });

const http = async function(conn: Deno.Conn, f: (requestEvent: any) => void) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
        f(requestEvent);
    }
}

const getURI = async function(requestEvent: any) {
    const url = new URL(requestEvent.request.url);
    console.log(`path: ${url.pathname}`);
}

const renderPage = async function(requestEvent: any) {
    await requestEvent.respondWith(
        new Response("hello world", {
            status: 200,
        })
    );
}

for await (const conn of server) {
    http(conn, renderPage);
}