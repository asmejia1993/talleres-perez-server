import { Repository, EntityRepository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    public async createProduct(
        createCustomerDto: CreateCustomerDto,
    ): Promise<Customer> {
        const { name, identification, address, phone } = createCustomerDto;

        const customer = new Customer();
        customer.name = name;
        customer.address = address;
        customer.phone = phone;
        customer.identification = identification;

        await customer.save();
        return customer;
    }

    // public async editProduct(
    //     createProductDto: CreateProductDTO,
    //     editedProduct: Product,
    // ): Promise<Customer> {
    //     const { name, description, price } = createProductDto;

    //     editedProduct.name = name;
    //     editedProduct.description = description;
    //     editedProduct.price = price;
    //     await editedProduct.save();

    //     return editedProduct;
    // }
}