const enhanceLevelMapper = (enhanceLevel: number): string => {
  switch (enhanceLevel) {
    case 1:
      return "pri";
    case 2:
      return "duo";
    case 3:
      return "tri";
    case 4:
      return "tet";
    case 5:
      return "pen";
  }
  return "Invalid";
};

export default enhanceLevelMapper;