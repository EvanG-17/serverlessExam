interface Car {
    make: string;
    color: string;
    registration: string;
    owner: string;
  }
  
  interface Bicycle {
    make: string;
    color: string;
    owner: string;
  }
  
  type Transporter = Car | Bicycle;
  
  const database: Transporter[] = [
   {   // Car
      make: "Toyota Yaris",
      color: "Red",
      registration: "231WD1234",
      owner: "Jane Smith",
   },
   {    // Car
      make: "Suzuki Swift",
      color: "Blue",
      registration: "241WD4321",
      owner: "Paul O Regan",
   },
   {   // Car
      make: "Ford Puma",
      color: "Blue",
      registration: "241WD1212",
      owner: "Eileen Silk",
   },
   {   // Bicycle
      make: "Revel Rascal XO",
      color: "Blue",
      owner: "Cindy Tamoka",
   },
   {    // Bicycle
      make: "Yeti SB140 LR",
      color: "Red",
      owner: " ",
   },
  ];


//https://www.geeksforgeeks.org/typescript-array-filter-method/
function getMatches(criteria: (t: Transporter) => boolean): Transporter[] {
    return database.filter((item) => {
      console.log("Filtering ", item); // lists items it starts filtering to see if it breaks
      return criteria(item);
    });
  }


  // Uncomment and Recomment as nessecary to select filtered result
  //const filteredTransporters = getMatches((t) => t.color === "Blue")
  //const filteredTransporters = getMatches((t) => t.color === "Red" && "registration" in t)
  const filteredTransporters = getMatches((t) => t.color === "Blue" && "registration" in t)
  console.log(filteredTransporters);

  