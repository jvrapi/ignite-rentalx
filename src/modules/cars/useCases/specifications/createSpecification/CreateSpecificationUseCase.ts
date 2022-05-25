import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists');
        }

        const specification = await this.specificationsRepository.create({
            description,
            name
        });

        return specification;
    }
}
export { CreateSpecificationUseCase };
