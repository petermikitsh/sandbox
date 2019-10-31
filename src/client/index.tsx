import csvtojson from "csvtojson";

const csv = `firstname,lastname,birthmonth
john,doe,march`;

csvtojson()
  .fromString(csv)
  .subscribe(d => {
    console.log(d);
  })
  .on("error", error => {
    console.log("error", error);
  });
