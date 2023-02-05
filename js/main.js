function main() {
  const deckNames = Object.keys(h2h[0]).slice(1);
  document.getElementById("deckNames").innerText = deckNames.reduce(
    (a, b) => a + ", " + b
  );
}

function recommend(s) {
  const average = (list) =>
    list.reduce((prev, curr) => prev + curr) / list.length;

  const meta = s.split(",");
  //document.writeln(JSON.stringify(first));
  //document.writeln(JSON.stringify(decks));
  let deckwinrates = [];
  for (let row of h2h) {
    const deck = Object.values(row)[0];
    //document.writeln(deck);
    //document.writeln(row["Elves"]);
    const winrates = [];
    for (let enemy of meta) {
      const stats = row[enemy];
      if (stats == "") {
        continue;
      }
      const [win, loss] = row[enemy];
      const total = win + loss;
      if (total == 0) {
        continue;
      }
      const winrate = (100 * win) / total;
      //if(isNaN(winrate)) {throw "winrate is NaN for "+deck+" vs "+enemy+": "+row[enemy];}
      winrates.push(winrate);
      //document.writeln(deck+" has a "+winrate.toFixed(2)+" % winrate vs "+enemy+"<br>");
    }
    if (winrates.length > 0) {
      deckwinrates.push([deck, average(winrates)]);
    }

    //	winrates.push([deck,winrate]);
    //document.writeln(JSON.stringify(row));
    //document.writeln("<br>"+deck+" "+wins+":"+losses+" "+100*wins/(wins+losses)+"%");
  }
  deckwinrates.sort((a, b) => a[1] <= b[1]);
  document.writeln("<!DOCTYPE html>");
  document.writeln(
    "Warning: quick prototype, no adjustments for small sample size"
  );
  document.writeln(
    `<h1>Best decks vs ${meta.reduce((a, b) => a + ", " + b)}</h1>`
  );
  document.writeln("<ul>");
  document.writeln(
    deckwinrates
      .map(([deck, winrate]) => `<li>${deck}: ${winrate.toFixed(2)} %</li>`)
      .reduce((a, b) => a + b)
  );
  document.writeln("</ul>");
}
