// זמני: הכרזות מודולים כדי לשתק שגיאות טיפוסים של חבילות דמה
declare module '@lg-chat/*' {
  const content: any;
  export = content;
}
