import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

Meteor.startup(() => {
  outerMethod._execute({userId: Random.id()}, {});
});

const innerMethod = new ValidatedMethod({
  name:     'innerMethod',
  validate: null,
  run({}) {
    console.log('Inner method userId: ', this.userId);
  },
});

const outerMethod = new ValidatedMethod({
  name:     'outerMethod',
  validate: null,
  run({}) {
    console.log('Outer method userId: ', this.userId);
    innerMethod.call({});
  },
});

