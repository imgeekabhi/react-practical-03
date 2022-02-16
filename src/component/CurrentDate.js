function CurrentDate() {
  const date = new Date();
  let currDate = date.toLocaleDateString();
  return <div style={{ fontSize: "55px", fontWeight: "bold" }}>{currDate}</div>;
}
export default CurrentDate;
