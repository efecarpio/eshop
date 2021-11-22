export abstract class CommonFunctions {
  /**
   * ----------------------------------------------------------------
   * Genera grupos de 4 caracteres randomicamente
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
   * ----------------------------------------------------------------
   */
   public static uuid(parts: number = 2): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
  /**
   * ----------------------------------------------------------------
   * Suma una columna de un array
   * @param lista. Arreglo/Lista de objetos
   * @param valur. Nombre del campo a sumarse
   * ----------------------------------------------------------------
   */
   public static sumJsonValues(lista: any[], value: string) {
    return lista.reduce((a, b) => {
      return a + b[value];
    }, 0 );
  }
  /**
   * ----------------------------------------------------------------
   * Valida si un objeto es válido o no.
   * @param response. Objeto a validarse
   * ----------------------------------------------------------------
   */
   public static isValidObject(response: any) {
    if (response !== null && typeof response.isvalid !== 'undefined' && response.isvalid) {
      return true;
    }
    return false;
  }
  /**
   * ----------------------------------------------------------------
   * Valida si un objeto es válido o no, retorna True si es invalido.
   * @param response. Objeto a validarse
   * ----------------------------------------------------------------
   */
  public static isUndefinedObject(response: any) {
    if (response !== null && typeof response !== 'undefined') {
      return false;
    }
    return true;
  }
  /**
   * ----------------------------------------------------------------
   * Valida si un objeto se encuentra vacio.
   * @param obj. Objeto a validarse
   * ----------------------------------------------------------------
   */
  public static isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
  }
}
