import {
  DeleteEventRepository,
  DeleteMatchRepository,
  LoadGroupRepository,
} from '../repositories';

export class DeleteEvent {
  constructor(
    private readonly loadGroupRepository: LoadGroupRepository,
    private readonly deleteEventRepository: DeleteEventRepository,
    private readonly deleteMatchRepository: DeleteMatchRepository,
  ) {}

  async perform({ id, userId }: { id: string; userId: string }): Promise<void> {
    const group = await this.loadGroupRepository.load({ eventId: id });
    if (group === undefined) throw new Error('Group not found');
    if (!group.isAdmin(userId)) throw new Error('User is not admin');
    await this.deleteEventRepository.delete({ id });
    await this.deleteMatchRepository.delete({ eventId: id });
  }
}
