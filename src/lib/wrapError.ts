export default <T>(f: () => T): { success: boolean; data?: T; error?: any } => {
  try {
    return { success: true, data: f() };
  } catch (e) {
    return { success: false, data: undefined, error: e };
  }
};
