class DeleteEvent {
  constructor(private readonly loadGroupRepository: LoadGroupRepository) {}

  async perform({ id, userId }: { id: string; userId: string }): Promise<void> {
    const group = await this.loadGroupRepository.load({ eventId: id });
    if (group === undefined) {
      throw new Error('Group not found');
    }
    if (group.users.find((user) => user.id === userId) === undefined) {
      throw new Error('User not found');
    }
    if (group.users.find((user) => user.id === userId)?.permission === 'user') {
      throw new Error('User is not have permission to delete event');
    }
  }
}

interface LoadGroupRepository {
  load: (input: { eventId: string }) => Promise<Group | undefined>;
}

type GrouUser = {
  id: string;
  permission: 'owner' | 'admin' | 'user';
};

type Group = {
  users: GrouUser[];
};

class LoadGroupRepositorySpy implements LoadGroupRepository {
  eventId?: string;
  callsCount = 0;
  output?: Group = {
    users: [{ id: 'anu_user_id', permission: 'admin' }],
  };

  async load({ eventId }: { eventId: string }): Promise<Group> {
    this.eventId = eventId;
    this.callsCount++;
    return this.output;
  }
}

type SutTypes = {
  sut: DeleteEvent;
  loadGroupRepository: LoadGroupRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadGroupRepository = new LoadGroupRepositorySpy();
  const sut = new DeleteEvent(loadGroupRepository);
  return { sut, loadGroupRepository };
};

describe('DeleteEvent', () => {
  const id = 'any_event_id';
  const userId = 'any_user_id';

  it('should get group data', async () => {
    const { sut, loadGroupRepository } = makeSut();

    await sut.perform({
      id,
      userId,
    });

    expect(loadGroupRepository.eventId).toBe(id);
    expect(loadGroupRepository.callsCount).toBe(1);
  });

  it('should throw if eventId is invalid', async () => {
    const { sut, loadGroupRepository } = makeSut();
    loadGroupRepository.output = undefined;

    const promise = sut.perform({
      id,
      userId,
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should throw if userId is invalid', async () => {
    const { sut, loadGroupRepository } = makeSut();
    loadGroupRepository.output = {
      users: [{ id: 'any_user_id', permission: 'admin' }],
    };

    const promise = sut.perform({
      id,
      userId: 'invalid_id',
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should throw if permission is user', async () => {
    const { sut, loadGroupRepository } = makeSut();
    loadGroupRepository.output = {
      users: [{ id: 'any_user_id', permission: 'user' }],
    };

    const promise = sut.perform({
      id,
      userId,
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should not throw if permission is admin', async () => {
    const { sut, loadGroupRepository } = makeSut();
    loadGroupRepository.output = {
      users: [{ id: 'any_user_id', permission: 'admin' }],
    };

    const promise = sut.perform({
      id,
      userId,
    });

    await expect(promise).resolves.not.toThrowError();
  });

  it('should not throw if permission is owner', async () => {
    const { sut, loadGroupRepository } = makeSut();
    loadGroupRepository.output = {
      users: [{ id: 'any_user_id', permission: 'owner' }],
    };

    const promise = sut.perform({
      id,
      userId,
    });

    await expect(promise).resolves.not.toThrowError();
  });
});
