export class CommonFunctions {
  public static uuid(parts = 2): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // eslint-disable-next-line no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
          .toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join("-");
  }

  public static sumJsonValues(lista: any[], value: string): number {
    return lista.reduce((a, b) => {
      return a + b[value];
    }, 0 );
  }
}
