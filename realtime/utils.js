const request = require("superagent");

function get_url(socket, path) {
	if (!path) {
		path = "";
	}
	const origin = socket.request.headers.origin;
	if (origin) {
		return origin + path;
	}
	// Fallback for same-origin requests that don't include the Origin header
	const proto = socket.request.headers["x-forwarded-proto"] || "http";
	const host =
		socket.request.headers["x-forwarded-host"] || socket.request.headers.host;
	return `${proto}://${host}${path}`;
}

// Authenticates a partial request created using superagent
function frappe_request(path, socket) {
	const partial_req = request.get(get_url(socket, path));
	if (socket.authorization_header) {
		return partial_req.set("Authorization", socket.authorization_header);
	} else if (socket.sid) {
		return partial_req.query({ sid: socket.sid });
	}
}

module.exports = {
	get_url,
	frappe_request,
};
