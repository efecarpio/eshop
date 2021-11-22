export interface IPopulateMessage {
  type: string;
  mensaje: string;
}

export interface IPopulateView {
  data: any;
  mensaje: IPopulateMessage;
}

export class BasePresenter {
  public static populateView(
      output: any, message= "", type = "success"
  ): any {
    try {
      if (!output) {
        return {
          mensaje: {
            type: "error",
            mensaje:
            "Se ha producido un error, por favor consulte con el administrador",
          },
        };
      }

      if (output.isFailure) {
        return {
          data: null,
          mensaje: {
            type: "error",
            mensaje: output.errorValue(),
          },
        };
      }

      const result = output.getResult();
      if (result.hasOwnProperty("links")) {
        return Object.assign({}, result, {
          mensaje: {
            type: (output.isSuccess) ? type : "error",
            mensaje: message,
          },
        });
      }

      return {
        data: output.getResult(),
        mensaje: {
          type: (output.isSuccess) ? type : "error",
          mensaje: message,
        },
      };
    } catch (e) {
      return e.message;
    }
  }

  public static errorView(e: any): any {
    return {
      data: null,
      mensaje: {
        type: "error",
        mensaje: e.message,
      },
    };
  }
}
