import { PartialType } from '@nestjs/mapped-types';

import { CreateSharedDTO } from './create-shared.dto';

export class UpdateSharedDTO extends PartialType(CreateSharedDTO) {}
