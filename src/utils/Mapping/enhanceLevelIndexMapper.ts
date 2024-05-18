const enhanceLevAndIndexMapper = (input: number) => {
  switch (input) {
    case 1:
      return 4;
    case 2:
      return 3;
    case 3:
      return 2;
    case 4:
      return 1;
    default:
      throw new Error("Invalid input");
  }
}

export default enhanceLevAndIndexMapper;