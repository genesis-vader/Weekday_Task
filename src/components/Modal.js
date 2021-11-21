import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(props.open);

  //   function closeModal() {
  //     setIsOpen(false);
  //   }

  function openModal() {
    setIsOpen(props.open);
  }

  return (
    <>

      <Transition appear show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={props.closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-50"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-1"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 blur-xl" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md bg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Profile
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Name: <strong>{props.selectedRow[0].full_name.toUpperCase()}</strong><br/>
                    Email: <strong>{props.selectedRow[0].emails[0].address}</strong><br/>
                    LinkedIn: <strong><a href={props.selectedRow[0].linkedin_url} className="border-none">{props.selectedRow[0].linkedin_url}</a></strong><br/>
                    Degree: <strong>{props.selectedRow[0].education[0].degrees[0]}</strong><br/>
                    Inferred Salary: <strong>{props.selectedRow[0].inferred_salary}</strong><br/>
                    Latest or Current Employer: <strong>{props.selectedRow[0].job_company_name}</strong><br/>
                    Experience: <strong>{props.selectedRow[0].inferred_years_experience} years</strong><br/>
                    Job Title: <strong>{props.selectedRow[0].job_title}</strong><br/>
                    Job Role: <strong>{props.selectedRow[0].job_title_role}</strong><br/><br/>

                    Skills: <strong>{props.selectedRow[0].skills.map(skill=>(<span>{skill},{" "}</span>))}</strong><br/>

                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={props.closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}