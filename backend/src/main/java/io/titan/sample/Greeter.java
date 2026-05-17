package io.titan.sample;

/** Domain logic for the Titan e2e sample backend. */
public final class Greeter {

    private Greeter() {
    }

    /**
     * Greet {@code name}, or the world when no name is given.
     *
     * @param name the name to greet, may be {@code null} or blank
     * @return the greeting line
     */
    public static String greet(String name) {
        if (name == null || name.isBlank()) {
            return "Hello, world!";
        }
        return "Hello, " + name.trim() + "!";
    }
}
