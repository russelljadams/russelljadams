export default function ClassifiedStamp({
  text = "DECLASSIFIED",
}: {
  text?: string;
}) {
  return <div className="classified-stamp">{text}</div>;
}
