# Test Doubles

There are five types: 

* Dummy
* Stub
* Spy
* Mock
* Fake

## Dummy

A dummy implements the interface, but explodes if you try to use it. For example, all the methods could throw runtime exceptions. 

Use a Dummy when you need to pass in something to a function to test it, but you also want to ensure the dummy never gets used.
 

## Stub

Like a dummy, a stub implements the interface. Unlike a dummy, it doesn't blow up - instead, it has canned return values. Use a stub as a stand-in for a read only collaborator.

## Spy

A spy also implements the interface, just like a dummy and a stub. However, you can interrogate a spy afterwards to see what happened. Use a spy for write-only collaborators. 

## Mock

If you're using a spy, and you end up making the same assertions about the spy in multiple different tests, you can dry up that code by putting a "verify" method on the spy that does the assertion for you. A spy with a `verify()` method is called a "Mock." Refactor from spies to mocks when you notice the duplication.  

## Fake

A fake implements the interface, just like all the other types. But it also exhibits the behavior you would expect from something of the type it represents (e.g., a fake in-memory repository). Fakes are the most dangerous type of test double to use, because they themselves require tests. However, the tests you would write for the fake implementation of the type would be the exact same tests that any "real" implementation of the type would also have to pass. That type of test is called a "contract test." Use fakes for collaborators that have read-write interfaces.   
