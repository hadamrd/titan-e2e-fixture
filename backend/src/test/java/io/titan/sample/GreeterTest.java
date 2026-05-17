package io.titan.sample;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

/** Tests for {@link Greeter}. */
class GreeterTest {

    @Test
    void greetsANamedCaller() {
        assertEquals("Hello, Titan!", Greeter.greet("Titan"));
    }

    @Test
    void defaultsToTheWorldWhenBlank() {
        assertEquals("Hello, world!", Greeter.greet(""));
        assertEquals("Hello, world!", Greeter.greet(null));
    }

    @Test
    void trimsSurroundingWhitespace() {
        assertEquals("Hello, Ada!", Greeter.greet("  Ada  "));
    }
}
