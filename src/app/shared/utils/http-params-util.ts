import {HttpParams} from "@angular/common/http";

export class HttpParamsUtil {

  extracted(name: string | undefined, page: number | undefined, size: number | undefined) {
    let params = new HttpParams();
    if (typeof name !== 'undefined') {
      params = params.append('name', name);
    }
    if (typeof page !== 'undefined') {
      params = params.append('page', page);
    }
    if (typeof size !== 'undefined') {
      params = params.append('size', size);
    }
    return params;
  }
}
