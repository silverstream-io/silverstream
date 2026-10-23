'use client'

export default function Contact() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
      
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            alert("Thanks! We'll be in touch soon.");
            form.reset();
          } else {
            alert('Failed to send message. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      };
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Let's talk about your business
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-200/65">
              Tell us a little about what's slowing your team down. We'll
              follow up to set up a free discovery call.
            </p>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="name"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="company"
                >
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-input w-full"
                  placeholder="Your phone number (optional)"
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="message"
                >
                  What's taking up too much of your team's time?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="form-textarea w-full"
                  placeholder="Inventory, invoicing, scheduling, paperwork... anything goes"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                Request a discovery call
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}