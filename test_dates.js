const eventDate = "2026-02-15T07:00:00.000Z";
const now = new Date("2026-03-04T10:01:56.000Z");
console.log("Event Date:", new Date(eventDate));
console.log("Now:", now);
console.log("Is future?", new Date(eventDate) >= now);

const diffTime = new Date(eventDate).getTime() - now.getTime();
console.log("Diff Time:", diffTime);
console.log("Days Remaining:", Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));
