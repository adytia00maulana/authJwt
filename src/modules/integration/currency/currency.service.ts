import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import axios from "axios";
import { coreResponse, currencyResponse } from "../../../config/response/coreResp.model";
import { Response } from "../../../config/response/baseResponse.model";

@Injectable()
export class CurrencyService {
  constructor() {
  }
  create(createCurrencyDto: CreateCurrencyDto) {
    return 'This action adds a new currency';
  }

  async findAll() {
    let resCurr: currencyResponse[] = [];
    const instance = axios.create();
    await instance.get('http://10.20.81.155:7878/api/getAllDataCurrency?page=all').then((response) => {
      const resp: coreResponse = response.data;
      if(resp.rc === '00') {
        resCurr = resp.data;
      } else {
        throw new NotFoundException(resp.rd);
      }
    }).catch((error) => {
      console.error('Error:', error);
      throw new NotFoundException("Internal Server Error");
    });
    let result: Response<any> = {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: resCurr
    };
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
