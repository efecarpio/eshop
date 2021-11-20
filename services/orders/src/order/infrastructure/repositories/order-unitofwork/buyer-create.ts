import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from '../../entities';

@Injectable()
export class BuyerCreateService {
  constructor(
    @InjectRepository(Buyer)
    private repository: Repository<Buyer>
  ) {}

  async execute({ buyer }) {
    const { email } = buyer;
    
    const customerStored = await this.repository.findOne({
      where: { email: email }
    });

    if (customerStored === undefined) {
      const customerSaved = await this.repository.save({
        ...buyer
      });
      if (customerSaved === undefined) {
        throw new Error('No se pudo guardar');
      }
      return customerSaved;
    }
    return customerStored;
  }
}
