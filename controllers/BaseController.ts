const Validator = require("validatorjs");
const pt_br = require("../lib/Validator");
Validator.setMessages("en", pt_br);
class BaseController {
  constructor() {}
  validateRequest(data, rules) {
    const validator = new Validator(data, rules);
    if (!validator.passes()) {
      let validationErrorFields = BaseController.toObject(validator);

      let keys = Object.keys(validationErrorFields);
      let description = "";
      keys.forEach((key) => {
        description += ` ${validationErrorFields[key]}`;
      });

      return BaseController.errorNormalizer({
        status: 400,
        error: "FIELDS_VALIDATION_ERROR",
        description: description,
        fields: validationErrorFields,
      });
    }
    return { status: 200 };
  }

  public static errorNormalizer(error) {
    let normalizedError = {
      error: {
        error: error.error,
        status: error.status,
        description: error.description,
        fields: error.fields || [],
      },
    };
    return normalizedError;
  }

  public handleError(error) {
    let normalizedError = error;
    if (error.code) {
      normalizedError = BaseController.errorList(error);
      return BaseController.errorNormalizer(normalizedError);
    }
    error.error = "INTERNAL_ERROR";
    error.status = 500;
    console.log(error);
    error.description = error.stack;
    return BaseController.errorNormalizer(error);
  }

  public static toObject(validation) {
    let allErrors = validation.errors.all();
    let keys = Object.keys(allErrors);
    let fields = {};
    keys.forEach((key) => {
      fields[key] = allErrors[key][0];
    });
    return fields;
  }
  public static errorList(error) {
    switch (error.code) {
      case 11000:
        error.status = 409;
        error.error = "DUPLICATED_USER";
        error.description =
          "Um usuario com essas credenciais ja existe em nossa base";
        return error;
      default:
        error.status = 400;
        error.error = "BACKEND_ERROR";
        error.description = "ocorreu um erro inesperado";
        return error;
    }
  }
}

export default BaseController;
